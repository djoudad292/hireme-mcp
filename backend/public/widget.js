/**
 * HireMe MCP — embeddable badge.
 *
 * Usage on any site:
 *   <script src="https://hireme-mcp-backend.onrender.com/widget.js" async></script>
 *   <script>window.HIREME_MCP = { apiUrl: "https://mcp.djaouad.tech" };</script>
 */
(function () {
  if (window.__hiremeMcpLoaded) return;
  window.__hiremeMcpLoaded = true;

  var cfg = Object.assign(
    { apiUrl: "https://mcp.djaouad.tech", label: "Hire via AI" },
    window.HIREME_MCP || {}
  );

  var css = document.createElement("style");
  css.textContent =
    "#hm-badge{position:fixed;bottom:20px;right:20px;z-index:2147483000;display:flex;align-items:center;gap:8px;" +
    "padding:10px 16px;border-radius:999px;background:#0a0c10;color:#f4f6fb;border:1px solid #232936;" +
    "font:500 13px/1 ui-sans-serif,system-ui,sans-serif;cursor:pointer;box-shadow:0 8px 24px rgba(0,0,0,.45);" +
    "transition:border-color .15s}#hm-badge:hover{border-color:#a3e635}" +
    "#hm-dot{width:8px;height:8px;border-radius:50%;background:#a3e635;box-shadow:0 0 0 0 rgba(163,230,53,.6);" +
    "animation:hm-pulse 2s infinite}" +
    "@keyframes hm-pulse{70%{box-shadow:0 0 0 8px rgba(163,230,53,0)}100%{box-shadow:0 0 0 0 rgba(163,230,53,0)}}";
  document.head.appendChild(css);

  var badge = document.createElement("button");
  badge.id = "hm-badge";
  badge.setAttribute("aria-label", cfg.label + " — opens MCP connection info");
  badge.innerHTML = '<span id="hm-dot"></span>' + cfg.label;
  badge.addEventListener("click", function () {
    window.open(cfg.apiUrl.replace(/\/+$/, "") + "/#connect", "_blank", "noopener,noreferrer");
  });
  document.body.appendChild(badge);
})();
