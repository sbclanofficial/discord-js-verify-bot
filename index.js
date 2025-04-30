require("dotenv").config();
const {
  Client,
  GatewayIntentBits,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  EmbedBuilder,
} = require("discord.js");

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
});

// Konfiguriere diese Configs in .env
const token = process.env.DISCORD_TOKEN; 
const channelId = process.env.CHANNEL_ID;
const roleIdToAdd = process.env.ROLE_ID_ADD;
const roleIdToRemove = process.env.ROLE_ID_REMOVE;

client.once("ready", async () => {
  console.log(`Eingeloggt als ${client.user.tag}`);

  try {
    const channel = await client.channels.fetch(channelId);
    if (!channel || !channel.isTextBased()) {
      console.error("Kanal nicht gefunden oder ist kein Textkanal");
      return;
    }

    const embed = new EmbedBuilder()
      .setTitle("Verifizierung")
      .setDescription("Klicke auf den Button unten, um dich zu verifizieren.")
      .setColor(0x00ff00);

    const button = new ButtonBuilder()
      .setCustomId("verify")
      .setLabel("Verifizieren")
      .setStyle(ButtonStyle.Primary);

    const row = new ActionRowBuilder().addComponents(button);

    await channel.send({ embeds: [embed], components: [row] });
  } catch (error) {
    console.error("Fehler beim Senden der Nachricht:", error);
  }
});

client.on("interactionCreate", async (interaction) => {
  if (!interaction.isButton()) return;

  if (interaction.customId === "verify") {
    try {
      const member = interaction.member;

      if (!member.roles.cache.has(roleIdToAdd)) {
        await member.roles.add(roleIdToAdd);
        await member.roles.remove(roleIdToRemove);
        await interaction.reply({
          content: "Du wurdest erfolgreich verifiziert!",
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: "Du bist bereits verifiziert!",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error("Fehler bei der Rollenverwaltung:", error);

      let errorMessage = "Ein Fehler ist aufgetreten.";
      if (error.code === 50013) {
        errorMessage = "Der Bot hat nicht die erforderlichen Berechtigungen.";
      }

      await interaction.reply({
        content: errorMessage,
        ephemeral: true,
      });
    }
  }
});

client.login(token);
