import type { McpServerUse, McpServer, McpTool } from "@roo-code/types"

export type McpToolType = "read" | "write" | "unspecified"

export function getMcpToolType(tool: McpTool): McpToolType {
	if (tool.readOnlyHint === true) {
		return "read"
	} else if (tool.readOnlyHint === false) {
		return "write"
	} else {
		return "unspecified"
	}
}

export function isMcpToolAlwaysAllowed(mcpServerUse: McpServerUse, mcpServers: McpServer[] | undefined): boolean {
	if (mcpServerUse.type === "use_mcp_tool" && mcpServerUse.toolName) {
		const server = mcpServers?.find((s: McpServer) => s.name === mcpServerUse.serverName)
		const tool = server?.tools?.find((t: McpTool) => t.name === mcpServerUse.toolName)
		return tool?.alwaysAllow || false
	}

	return false
}
