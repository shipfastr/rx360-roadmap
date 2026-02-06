# Rx360 Roadmap App — Backlog

## Next Iteration Features

### 1. Jira Epic Linking
- Add `jiraKey` field to each task object (e.g., `"RX-142"`)
- Make task bars clickable → links to `https://{org}.atlassian.net/browse/{jiraKey}`
- Hover tooltip shows epic status (pulled from Jira API)
- Config: Jira org URL as an environment variable

### 2. Milestone Completion Tracking
- Add `status` field to tasks: `"done"` | `"in-progress"` | `"upcoming"`
- Visual states:
  - **Done:** Green bar (#10b981)
  - **In-progress:** Partial fill or animated border
  - **Upcoming:** Current styling (version color)
- Milestone diamonds flip green when all tasks in that version are `"done"`

### 3. Future Considerations
- Auto-sync status from Jira API (polling or webhook)
- Shareable filtered views (URL params for version scope)
- Export to PDF / image for stakeholder decks
- Dark/light mode toggle
