"use client";

import { useEffect, useRef, useState } from "react";
import * as d3 from "d3";

interface MindMapNode {
  title: string;
  children?: MindMapNode[];
}

interface MindMapProps {
  data: {
    mindmap: {
      title: string;
      children: MindMapNode[];
    };
  };
}

export function MindMap({ data }: MindMapProps) {
  const svgRef = useRef<SVGSVGElement>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const [isFullScreen, setIsFullScreen] = useState(false);

  useEffect(() => {
    if (!svgRef.current) return;

    const updateDimensions = () => {
      const container = svgRef.current?.parentElement;
      if (container) {
        setDimensions({
          width: container.clientWidth,
          height: container.clientHeight,
        });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  useEffect(() => {
    if (!svgRef.current || !dimensions.width || !dimensions.height) return;

    d3.select(svgRef.current).selectAll("*").remove();

    const margin = { top: 20, right: 20, bottom: 20, left: 20 };
    const width = dimensions.width - margin.left - margin.right;
    const height = dimensions.height - margin.top - margin.bottom;

    const svg = d3
      .select(svgRef.current)
      .attr("width", width + margin.right + margin.left)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", `translate(${margin.left},${margin.top})`);

    const hierarchy = d3.hierarchy(data.mindmap);
    
    const treeLayout = d3.tree()
      .size([height - 100, width - 200])
      .separation((a, b) => (a.parent === b.parent ? 1 : 1.2));

    const treeData = treeLayout(hierarchy);

    const diagonal = d3.linkHorizontal()
      .x((d: any) => d.y)
      .y((d: any) => d.x);

    svg.selectAll(".link")
      .data(treeData.links())
      .join("path")
      .attr("class", "link")
      .attr("d", diagonal)
      .style("fill", "none")
      .style("stroke", "#ccc")
      .style("stroke-width", 1.5);

    const nodes = svg.selectAll(".node")
      .data(treeData.descendants())
      .join("g")
      .attr("class", "node")
      .attr("transform", (d: any) => `translate(${d.y},${d.x})`);

    const getTextWidth = (text: string) => {
      const tempText = svg.append("text").text(text);
      const width = tempText.node()?.getBBox().width || 0;
      tempText.remove();
      return width;
    };

    nodes.each(function(d: any) {
      const node = d3.select(this);
      const padding = 10;
      const textWidth = getTextWidth(d.data.title);
      const rectWidth = textWidth + (padding * 2);
      const rectHeight = 30;

      if (d.depth <= 1) {
        node.append("rect")
          .attr("x", -rectWidth / 2)
          .attr("y", -rectHeight / 2)
          .attr("width", rectWidth)
          .attr("height", rectHeight)
          .attr("rx", 15)
          .attr("ry", 15)
          .style("fill", d.depth === 0 ? "#4A90E2" : "#67B7DC")
          .style("stroke", "white")
          .style("stroke-width", 2);
      }

      node.append("text")
        .attr("dy", ".35em")
        .attr("x", d.depth <= 1 ? 0 : 10)
        .attr("text-anchor", d.depth <= 1 ? "middle" : "start")
        .style("fill", d.depth <= 1 ? "white" : "black")
        .style("font-size", d.depth === 0 ? "16px" : "14px")
        .style("font-weight", d.depth <= 1 ? "bold" : "normal")
        .text(d.data.title);
    });

    const zoom = d3.zoom()
      .scaleExtent([0.5, 2])
      .on("zoom", (event) => {
        svg.attr("transform", event.transform);
      });

    d3.select(svgRef.current).call(zoom);

  }, [data, dimensions]);

  const toggleFullScreen = () => {
    if (!svgRef.current) return;
    const element = svgRef.current.closest("div");
    if (element) {
      if (!document.fullscreenElement) {
        element.requestFullscreen().catch((err) => console.error(err));
      } else {
        document.exitFullscreen().catch((err) => console.error(err));
      }
    }
    setIsFullScreen(!isFullScreen);
  };

  return (
    <div className="w-full h-full min-h-[600px] overflow-auto relative bg-white">
      <svg ref={svgRef} className="w-full h-full" />
      <button
        className="absolute top-4 right-4 bg-blue-500 text-white p-2 rounded"
        onClick={toggleFullScreen}
      >
        {isFullScreen ? "Exit Fullscreen" : "Full Screen"}
      </button>
    </div>
  );
}