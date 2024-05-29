CREATE TABLE IF NOT EXISTS messages (
	user_id VARCHAR NOT NULL,
	server_id VARCHAR NOT NULL,
	channel_id VARCHAR NOT NULL,
	created_at TIMESTAMP NOT NULL,
	attachment BOOLEAN NOT NULL,
	attachment_amount INT NOT NULL,
	PRIMARY KEY (user_id, server_id, channel_id, created_at)
)