import { Eta } from "https://deno.land/x/eta@v3.4.0/src/index.ts";
import { Hono } from "https://deno.land/x/hono@v3.12.11/mod.ts";
import * as feedbacks from "./feedbacks.js";

const eta = new Eta({ views: `${Deno.cwd()}/templates/` });
const app = new Hono();

app.get("/", async (context) => {
  const renderedHtml = eta.render("index.eta");
  return context.html(renderedHtml);
});

app.get("/feedbacks/:id", async (context) => {
  const feedbackId = context.req.param("id");
  const count = await feedbacks.getFeedbackCount(feedbackId);
  return context.text(`Feedback ${feedbackId}: ${count}`);
});

app.post("/feedbacks/:id", async (context) => {
  const feedbackId = context.req.param("id");
  await feedbacks.incrementFeedbackCount(feedbackId);
  return context.redirect("/");
});

export default app;