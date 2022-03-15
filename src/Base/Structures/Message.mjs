import { DiscordSnowflake } from '@sapphire/snowflake';
import Collection from './Collection.mjs';

export default class Message {
    constructor(data, bot) {
        this.bot = bot;

        this.id = data.id;
        this.channelId = data.channel_id;
        this.guildId = data.guild_id ?? null;
        this.createdTimestamp = DiscordSnowflake.timestampFrom(this.id);
        this.timestamp = data.timestamp;
        this.type = 'type' in data ? data.type : null;
        this.content = 'content' in data ? data.content : null;
        this.author = 'author' in data ? data.author : null;
        this.pinned = 'pinned' in data ? Boolean(data.pinned) : null;
        this.embeds = 'embeds' in data ? data.embeds : [];
        this.components = 'components' in data ? this.components : [];
        if ('attachments' in data) {
            this.attachments = new Collection();
            for (const attachment of data.attachments)
                this.attachments.set(attachment.id, attachment);
        }
        this.editedTimestamp = data.edited_timestamp
            ? Date.parse(data.edited_timestamp)
            : null;
        this.reactions = 'reactions' in data ? data.reactions : [];
        this.mentions = data.mentions;
        this.mention_roles = data.mention_roles;
        this.mention_everyone = data.mention_everyone;
        this.mention_channels = data.mention_channels;
        this.webhookId = 'webhook_id' in data ? data.webhook_id : null;
        this.member = data.member ? data.member : null;
        if ('message_reference' in data) {
            this.reference = {
                channelId: data.message_reference.channel_id,
                guildId: data.message_reference.guild_id,
                messageId: data.message_reference.message_id,
            };
        } else {
            this.reference ??= null;
        }
        if (data.interaction) {
            this.interaction = {
                id: data.interaction.id,
                type: data.interaction.type,
                commandName: data.interaction.name,
                user: tdata.interaction,
            };
        } else {
            this.interaction ??= null;
        }
    }

    async edit(...options) {
        const msg = await this.bot.api.patch(
            `/channels/${this.channelId}/messages/${this.id}`,
            ...options,
        );
        return new Message(msg, this.bot);
    }

    async delete(...options) {
        await this.bot.api.delete(
            `channels/${this.channelId}/messages/${this.id}`,
        );
    }
}
