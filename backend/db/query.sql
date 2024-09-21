-- name: getConversationMessages :many
SELECT
    *
FROM
    Messages
WHERE
    conversation_id = @conversation_id
ORDER BY
    created_at DESC;
