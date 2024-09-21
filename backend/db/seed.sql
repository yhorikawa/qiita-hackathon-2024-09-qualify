BEGIN TRANSACTION;

-- 会話を挿入
INSERT INTO Conversations(code)VALUES('1c0c86d6-ea23-418f-9a45-d67cbd073b3b');

-- メッセージを挿入
INSERT INTO Messages(conversation_id,sender,message)VALUES(LAST_INSERT_ROWID(),'user','Hello, world!');
INSERT INTO Messages(conversation_id,sender,message)VALUES(LAST_INSERT_ROWID(),'ai','Hello, user!');

COMMIT;
