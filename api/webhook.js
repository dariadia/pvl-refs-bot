process.env.NTBA_FIX_319 = "test"
import TelegramBot from "node-telegram-bot-api"
import { NAMES } from "./db.js"

export default async (request, response) => {
  try {
    const bot = new TelegramBot(process.env.TELEGRAM_TOKEN)
    const { body } = request
    if (body.message) {
      const {
        chat: { id },
        text,
      } = body.message
      const match = NAMES[text]
      if (match) {
        await bot.sendMessage(id, match, { parse_mode: "Markdown" })
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
