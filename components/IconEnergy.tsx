import React from "react";

var cor = "#FF0000";
var cor_fonte = "#212121";
var tamanho_fonte = "20px";
var tamanho_casa = "20px";
var texto = "B";

type props = {
  cor?: string;
  cor_fonte?: string;
  tamanho_casa?: string;
  texto?: string;
};
export default function IconEnergy(props: props) {
  return (
    <>
      <div style={{ width: props.tamanho_casa ,display:"inline-flex"}}>
        <svg viewBox="5.154 5.157 166.238 193.64">
          <rect
            style={{ fill: props.cor, stroke: props.cor }}
            x="16.108"
            y="67.362"
            width="143.041"
            height="114.192"
          ></rect>
          <path
            style={{ fill: props.cor, stroke: props.cor }}
            d="M 88.416 13.169 L 169.675 67.937 L 7.157 67.937 L 88.416 13.169 Z"
          ></path>

          <text
            style={{
              fill: props.cor_fonte,
              whiteSpace: "pre",
              fontSize: "1.5rem",
              letterSpacing: "-0.1rem",
            }}
            x={props.texto!.length === 1 ? "181.768" : "178.068"}
            y="247.644"
            dx="27.062"
            dy="27.706"
            transform="matrix(8.914917945861816, 0, 0, 6.575071811676025, -1813.49169921875, -1659.0751953125)"
          >
            {props.texto}
          </text>
        </svg>
      </div>
    </>
  );
}
