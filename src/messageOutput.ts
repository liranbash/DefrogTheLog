const messageOutput:string = "### Call Analysis Summary\n" +
    "\n" +
    "**CallId: 17222894**\n" +
    "- **Events Sequence**:\n" +
    "  - `EVENT_DELIVERED` (twice)\n" +
    "  - `EVENT_RTP_START` (twice)\n" +
    "  - `EVENT_START_CALL` (twice)\n" +
    "  - `EVENT_RTP_STOP` (twice)\n" +
    "  - `EVENT_CONNECTION_CLEARED` (twice)\n" +
    "  - `CallCleared`\n" +
    "- **Issues Found**:\n" +
    "  - Redundant `EVENT_DELIVERED`\n" +
    "  - Redundant `EVENT_START_CALL`\n" +
    "  - All relevant events appear in the correct logical order.\n" +
    "- **Summary**: The phone rang, call was answered, data transmission started, then stopped, and call ended. Redundant but correctly ordered events were noted.";
export default messageOutput;