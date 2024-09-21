-- name: createConversation :exec
INSERT INTO Conversations (code) VALUES (@code);

-- name: createMessage :exec
INSERT INTO Messages (conversation_id, sender, message) VALUES (@conversation_id, @sender, @message);

-- name: getConversationMessages :many
SELECT
    *
FROM
    Messages
WHERE
    conversation_id = @conversation_id
ORDER BY
    created_at DESC;
