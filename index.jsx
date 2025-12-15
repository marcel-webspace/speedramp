import React from "react";
import ReactDOM from "react-dom";

import { SpeedRampPanel } from "./panels/SpeedRampPanel.jsx";

import { entrypoints } from "uxp";

// Panel controller that properly creates the DOM
class SpeedRampController {
    create() {
        const root = document.createElement("div");
        root.id = "speedramp-root";
        root.style.height = "100%";
        root.style.width = "100%";
        
        ReactDOM.render(<SpeedRampPanel />, root);
        
        return root;
    }
    
    show() {
        console.log("Speed Ramp Pro shown");
    }
    
    hide() {
        console.log("Speed Ramp Pro hidden");
    }
    
    destroy() {
        const root = document.getElementById("speedramp-root");
        if (root) {
            ReactDOM.unmountComponentAtNode(root);
        }
    }
}

const controller = new SpeedRampController();

entrypoints.setup({
    plugin: {
        create(plugin) {
            console.log("Speed Ramp Pro loaded");
        },
        destroy() {
            console.log("Speed Ramp Pro destroyed");
        }
    },
    panels: {
        speedramp: controller
    }
});
