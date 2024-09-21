-- name: createConversation :exec
INSERT INTO Conversations (code) VALUES (@code);

-- name: getConversationByCode :one
SELECT
    *
FROM
    Conversations
WHERE
    code = @code;

-- name: getConversationById :one
SELECT
    *
FROM
    Conversations
WHERE
    id = @id;

-- name: createMessage :exec
INSERT INTO Messages (conversation_id, sender, message) VALUES (@conversation_id, @sender, @message);

-- name: getMessagesByConversationId :many
SELECT
    *
FROM
    Messages
WHERE
    conversation_id = @conversation_id
ORDER BY
    created_at DESC;

-- name: getConversationMessages :many
SELECT
    *
FROM
    Messages
WHERE
    conversation_id = @conversation_id
ORDER BY
    created_at DESC;
