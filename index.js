import { entrypoints } from "uxp";

// Simples Panel ohne React zum Testen
class SpeedRampController {
    create() {
        console.log("SpeedRampController.create() called");
        
        const root = document.createElement("div");
        root.style.cssText = `
            background: #F5F5F7;
            height: 100%;
            width: 100%;
            padding: 16px;
            box-sizing: border-box;
            font-family: -apple-system, BlinkMacSystemFont, sans-serif;
        `;
        
        root.innerHTML = `
            <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 16px;">
                <div style="display: flex; align-items: center; gap: 8px; font-size: 20px; font-weight: 600; color: #1a1a1a;">
                    <span style="font-size: 24px;">⚡</span>
                    <span>Speed Ramp Pro</span>
                </div>
                <button id="applyBtn" style="background: #22C55E; color: white; border: none; padding: 8px 20px; border-radius: 8px; font-size: 14px; font-weight: 600; cursor: pointer;">
                    Bereit
                </button>
            </div>
            
            <div style="background: white; border-radius: 12px; padding: 16px; margin-bottom: 16px; box-shadow: 0 1px 3px rgba(0,0,0,0.1);">
                <canvas id="curveCanvas" width="300" height="180" style="width: 100%; height: 180px; cursor: crosshair;"></canvas>
            </div>
            
            <div id="presets" style="display: grid; grid-template-columns: repeat(4, 1fr); gap: 8px;">
            </div>
        `;
        
        // Initialize after DOM is ready
        setTimeout(() => {
            this.initCanvas(root);
            this.initPresets(root);
            this.initButton(root);
        }, 100);
        
        return root;
    }
    
    initCanvas(root) {
        const canvas = root.querySelector("#curveCanvas");
        if (!canvas) {
            console.error("Canvas not found!");
            return;
        }
        
        const ctx = canvas.getContext("2d");
        const width = canvas.width;
        const height = canvas.height;
        
        // Clear
        ctx.fillStyle = "#FFFFFF";
        ctx.fillRect(0, 0, width, height);
        
        // Grid
        ctx.strokeStyle = "#E5E7EB";
        ctx.lineWidth = 1;
        for (let i = 0; i <= 4; i++) {
            const y = (height / 4) * i;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(width, y);
            ctx.stroke();
        }
        
        // Baseline
        ctx.strokeStyle = "#22C55E";
        ctx.setLineDash([6, 4]);
        ctx.beginPath();
        ctx.moveTo(0, height * 0.9);
        ctx.lineTo(width, height * 0.9);
        ctx.stroke();
        ctx.setLineDash([]);
        
        // Curve
        ctx.strokeStyle = "#3B82F6";
        ctx.lineWidth = 3;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(0, height * 0.85);
        ctx.bezierCurveTo(width * 0.15, height * 0.85, width * 0.2, height * 0.15, width * 0.25, height * 0.15);
        ctx.bezierCurveTo(width * 0.35, height * 0.15, width * 0.4, height * 0.9, width * 0.5, height * 0.9);
        ctx.bezierCurveTo(width * 0.6, height * 0.9, width * 0.65, height * 0.15, width * 0.75, height * 0.15);
        ctx.bezierCurveTo(width * 0.85, height * 0.15, width * 0.9, height * 0.85, width, height * 0.85);
        ctx.stroke();
        
        // Points
        const points = [
            { x: 0, y: 0.85 },
            { x: 0.25, y: 0.15 },
            { x: 0.5, y: 0.9 },
            { x: 0.75, y: 0.15 },
            { x: 1, y: 0.85 }
        ];
        
        points.forEach(p => {
            const px = p.x * width;
            const py = p.y * height;
            
            ctx.fillStyle = "#3B82F6";
            ctx.beginPath();
            ctx.arc(px, py, 8, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.fillStyle = "#FFFFFF";
            ctx.beginPath();
            ctx.arc(px, py, 3, 0, Math.PI * 2);
            ctx.fill();
        });
        
        // Labels
        ctx.fillStyle = "#9CA3AF";
        ctx.font = "11px sans-serif";
        ctx.fillText("10x", 5, 12);
        ctx.fillText("0.1x", 5, height - 5);
        
        console.log("Canvas initialized");
    }
    
    initPresets(root) {
        const presetsContainer = root.querySelector("#presets");
        if (!presetsContainer) return;
        
        const presets = [
            { id: "custom", name: "Custom", color: "#6B7280" },
            { id: "montage", name: "Montage", color: "#F59E0B" },
            { id: "bullet", name: "Bullet", color: "#06B6D4" },
            { id: "hero", name: "Hero", color: "#A855F7" },
            { id: "flash", name: "Flash", color: "#EF4444" },
            { id: "glide", name: "Glide", color: "#22C55E" },
            { id: "whip", name: "Whip", color: "#6366F1" },
            { id: "slow", name: "Slow", color: "#F97316" }
        ];
        
        presets.forEach((preset, index) => {
            const btn = document.createElement("button");
            btn.style.cssText = `
                display: flex;
                flex-direction: column;
                align-items: center;
                gap: 6px;
                padding: 12px 8px;
                background: white;
                border: 2px solid ${index === 1 ? "#3B82F6" : "transparent"};
                border-radius: 10px;
                cursor: pointer;
                box-shadow: 0 1px 2px rgba(0,0,0,0.05);
            `;
            
            btn.innerHTML = `
                <div style="width: 28px; height: 28px; color: ${preset.color};">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                        <circle cx="12" cy="12" r="8" />
                    </svg>
                </div>
                <span style="font-size: 11px; font-weight: 500; color: ${index === 1 ? "#3B82F6" : "#374151"};">
                    ${preset.name}
                </span>
            `;
            
            btn.addEventListener("click", () => {
                console.log("Preset clicked:", preset.name);
                // Update selection
                presetsContainer.querySelectorAll("button").forEach(b => {
                    b.style.borderColor = "transparent";
                    b.querySelector("span").style.color = "#374151";
                });
                btn.style.borderColor = "#3B82F6";
                btn.querySelector("span").style.color = "#3B82F6";
            });
            
            presetsContainer.appendChild(btn);
        });
        
        console.log("Presets initialized");
    }
    
    initButton(root) {
        const btn = root.querySelector("#applyBtn");
        if (!btn) return;
        
        btn.addEventListener("click", () => {
            console.log("Apply button clicked!");
            btn.textContent = "Applying...";
            btn.style.background = "#9CA3AF";
            
            setTimeout(() => {
                btn.textContent = "Done!";
                btn.style.background = "#22C55E";
                
                setTimeout(() => {
                    btn.textContent = "Bereit";
                }, 1000);
            }, 1000);
        });
        
        console.log("Button initialized");
    }
    
    show() {
        console.log("Panel shown");
    }
    
    hide() {
        console.log("Panel hidden");
    }
    
    destroy() {
        console.log("Panel destroyed");
    }
}

const controller = new SpeedRampController();

entrypoints.setup({
    plugin: {
        create(plugin) {
            console.log("Speed Ramp Pro plugin created");
        },
        destroy() {
            console.log("Speed Ramp Pro plugin destroyed");
        }
    },
    panels: {
        speedramp: controller
    }
});

console.log("Speed Ramp Pro loaded!");
