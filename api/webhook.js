process.env.NTBA_FIX_319 = "test"
import TelegramBot from "node-telegram-bot-api"
import { NAMES, CHARACTER_REFS } from "./db.js"

export default async (request, response) => {
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN)
    const { body } = request
    if (body.message) {
      const {
        chat: { id },
        text,
      } = body.message
      const character_key = text.toLocaleLowerCase()
      if (NAMES.includes(character_key)) {
        for (let item of CHARACTER_REFS[character_key]) {
          await bot.sendPhoto({
            id,
            caption: text,
            photo: `../assets/${item}`,
          })
        }
      } else
        await bot.sendMessage(
          id,
          "Ничего не нашли 🤷 Напиши Данке, чтоб добавила @thiswitchsmokes",
          { parse_mode: "Markdown" }
        )
    }
  } catch (error) {
    console.error("Error sending message")
    console.log(error.toString())
  }
  response.send("OK")
}
