CREATE TABLE IF NOT EXISTS Conversations (
	id INTEGER PRIMARY KEY AUTOINCREMENT,
  code TEXT NOT NULL,
	created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
	updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime'))
);

CREATE TABLE IF NOT EXISTS Messages (
 	id INTEGER PRIMARY KEY AUTOINCREMENT,
 	conversation_id INTEGER NOT NULL,
 	sender TEXT NOT NULL,
 	message TEXT NOT NULL,
 	created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
 	updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
 	FOREIGN KEY (conversation_id) REFERENCES Conversations(id)
);

CREATE TABLE IF NOT EXISTS Documents (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  conversation_id INTEGER NOT NULL,
  content TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  updated_at TEXT NOT NULL DEFAULT (DATETIME('now', 'localtime')),
  FOREIGN KEY (conversation_id) REFERENCES Conversations(id)
);
