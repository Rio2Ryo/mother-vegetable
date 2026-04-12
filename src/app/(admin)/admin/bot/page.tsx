"use client";

import { useEffect, useState, useCallback } from "react";
import { getBotConfig, updateBotConfig, type BotConfig } from "@/lib/admin-data";

export default function BotPage() {
  const [config, setConfig] = useState<BotConfig | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saveMsg, setSaveMsg] = useState<string | null>(null);

  // Form fields
  const [name, setName] = useState("");
  const [systemPrompt, setSystemPrompt] = useState("");
  const [persona, setPersona] = useState("");
  const [welcomeMessage, setWelcomeMessage] = useState("");
  const [trainingNotes, setTrainingNotes] = useState("");
  const [status, setStatus] = useState("active");

  const load = useCallback(async () => {
    try {
      const cfg = await getBotConfig();
      setConfig(cfg);
      setName(cfg.name);
      setSystemPrompt(cfg.systemPrompt);
      setPersona(cfg.persona);
      setWelcomeMessage(cfg.welcomeMessage);
      setTrainingNotes(cfg.trainingNotes);
      setStatus(cfg.status);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load bot config");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  async function handleSave() {
    setSaving(true);
    setSaveMsg(null);
    try {
      const updated = await updateBotConfig({
        name,
        systemPrompt,
        persona,
        welcomeMessage,
        trainingNotes,
        status,
      });
      setConfig(updated);
      setSaveMsg("Saved successfully");
      setTimeout(() => setSaveMsg(null), 3000);
    } catch (err) {
      setSaveMsg(err instanceof Error ? err.message : "Save failed");
    } finally {
      setSaving(false);
    }
  }

  if (error) {
    return (
      <div className="flex h-64 flex-col items-center justify-center gap-2 text-red-500">
        <p className="text-lg font-medium">Error</p>
        <p className="text-sm">{error}</p>
      </div>
    );
  }

  if (loading || !config) {
    return (
      <div className="flex h-64 items-center justify-center text-gray-400">
        Loading...
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">AI Bot</h1>
          <p className="mt-1 text-sm text-gray-500">
            Configure the customer support chat bot.
          </p>
        </div>
        <div className="flex items-center gap-3">
          {saveMsg && (
            <span
              className={`text-sm font-medium ${
                saveMsg.includes("success")
                  ? "text-emerald-600"
                  : "text-red-600"
              }`}
            >
              {saveMsg}
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving}
            className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-emerald-700 disabled:opacity-50"
          >
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        {/* Main form */}
        <div className="lg:col-span-2 space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">General</h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Bot Name
              </label>
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="MV Assistant"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <button
                onClick={() =>
                  setStatus(status === "active" ? "inactive" : "active")
                }
                className={`rounded-full px-3 py-1 text-sm font-medium ${
                  status === "active"
                    ? "bg-green-100 text-green-700"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {status === "active" ? "Active" : "Inactive"}
              </button>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Welcome Message
              </label>
              <input
                value={welcomeMessage}
                onChange={(e) => setWelcomeMessage(e.target.value)}
                placeholder="Hi! How can I help you today?"
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">
              AI Configuration
            </h2>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                System Prompt
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Instructions sent to the AI model before each conversation. If
                left blank the built-in default prompt will be used.
              </p>
              <textarea
                value={systemPrompt}
                onChange={(e) => setSystemPrompt(e.target.value)}
                rows={6}
                placeholder="You are a helpful customer support assistant for Mother Vegetable..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Persona
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Additional personality traits or tone guidelines for the bot.
              </p>
              <textarea
                value={persona}
                onChange={(e) => setPersona(e.target.value)}
                rows={3}
                placeholder="Friendly and professional, answers in the user's language..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Training Notes
              </label>
              <p className="text-xs text-gray-500 mb-1">
                Extra knowledge or FAQ answers the bot should know about.
              </p>
              <textarea
                value={trainingNotes}
                onChange={(e) => setTrainingNotes(e.target.value)}
                rows={4}
                placeholder="Our return policy is 30 days. We ship from Tokyo, Japan..."
                className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500"
              />
            </div>
          </div>
        </div>

        {/* Preview sidebar */}
        <div className="space-y-5">
          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              Widget Preview
            </h2>
            <div className="rounded-lg border border-gray-200 bg-gray-50 p-4">
              {/* Simulated chat widget */}
              <div className="flex items-center gap-2 mb-3 pb-3 border-b border-gray-200">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-600 text-white text-xs font-bold">
                  {name ? name.charAt(0).toUpperCase() : "M"}
                </div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {name || "MV Assistant"}
                  </p>
                  <p className="text-xs text-gray-500">
                    {status === "active" ? "Online" : "Offline"}
                  </p>
                </div>
              </div>
              {welcomeMessage && (
                <div className="rounded-lg bg-white p-3 text-sm text-gray-700 shadow-sm">
                  {welcomeMessage}
                </div>
              )}
              {!welcomeMessage && (
                <p className="text-xs text-gray-400 italic">
                  No welcome message set
                </p>
              )}
            </div>
          </div>

          <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm">
            <h2 className="text-sm font-semibold text-gray-900 mb-2">Info</h2>
            <dl className="space-y-2 text-sm">
              <div>
                <dt className="text-gray-500">Created</dt>
                <dd className="text-gray-900">
                  {new Date(config.createdAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </dd>
              </div>
              <div>
                <dt className="text-gray-500">Last Updated</dt>
                <dd className="text-gray-900">
                  {new Date(config.updatedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </dd>
              </div>
            </dl>
          </div>
        </div>
      </div>
    </div>
  );
}
