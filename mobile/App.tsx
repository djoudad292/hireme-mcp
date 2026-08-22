import React, { useState } from "react";
import {
  ActivityIndicator,
  Linking,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { API_URL } from "./config";

const C = {
  bg: "#0a0c10",
  card: "#11141b",
  border: "#232936",
  fg: "#f4f6fb",
  muted: "#8b94a7",
  lime: "#a3e635",
};

type Tab = "profile" | "tools" | "briefs";

const TOOLS: { id: string; label: string; args: Record<string, unknown> }[] = [
  { id: "get_profile", label: "get_profile", args: {} },
  { id: "search_projects", label: "search_projects", args: { query: "RAG" } },
  { id: "get_pricing", label: "get_pricing", args: {} },
  { id: "get_next_slot", label: "get_next_slot", args: {} },
];

export default function App() {
  const [tab, setTab] = useState<Tab>("profile");

  return (
    <SafeAreaView style={s.root}>
      <Text style={s.brand}>
        HireMe <Text style={{ color: C.lime }}>MCP</Text>
      </Text>
      <ScrollView style={s.body} contentContainerStyle={{ padding: 16, gap: 12 }}>
        {tab === "profile" && <ProfileView />}
        {tab === "tools" && <ToolsView />}
        {tab === "briefs" && <BriefsView />}
      </ScrollView>
      <View style={s.tabbar}>
        {(["profile", "tools", "briefs"] as Tab[]).map((t) => (
          <TouchableOpacity key={t} style={s.tab} onPress={() => setTab(t)}>
            <Text style={[s.tabLabel, tab === t && { color: C.lime }]}>{t}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

function ProfileView() {
  return (
    <>
      <Card>
        <Text style={s.h1}>Djaouad Frih</Text>
        <Text style={s.muted}>Full-Stack AI Engineer — remote worldwide</Text>
        <Text style={s.p}>
          Production AI agents, RAG systems and the products around them — shipped, not demoed. This
          app talks to the same tools an AI agent sees over MCP.
        </Text>
      </Card>
      <Card>
        <Text style={s.label}>Connect any AI client</Text>
        <Text style={s.mono}>{API_URL}/mcp</Text>
      </Card>
      <Card>
        <Text style={s.label}>Contact</Text>
        <TouchableOpacity onPress={() => Linking.openURL("https://calendly.com/oufr29/30min")}>
          <Text style={s.link}>Book a free call →</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => Linking.openURL("https://djaouad.tech")}>
          <Text style={s.link}>djaouad.tech →</Text>
        </TouchableOpacity>
      </Card>
    </>
  );
}

function ToolsView() {
  const [tool, setTool] = useState(TOOLS[0]);
  const [out, setOut] = useState("");
  const [busy, setBusy] = useState(false);

  const run = async () => {
    setBusy(true);
    setOut("");
    try {
      const res = await fetch(`${API_URL}/api/tools/${tool.id}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tool.args),
      });
      const data = await res.json();
      setOut(data?.content?.[0]?.text ?? JSON.stringify(data));
    } catch (e) {
      setOut(`Error: ${e instanceof Error ? e.message : "request failed"}`);
    } finally {
      setBusy(false);
    }
  };

  return (
    <>
      <Card>
        <Text style={s.label}>Same tools Claude sees over MCP</Text>
        <View style={{ flexDirection: "row", flexWrap: "wrap", gap: 8, marginTop: 8 }}>
          {TOOLS.map((t) => (
            <TouchableOpacity
              key={t.id}
              onPress={() => setTool(t)}
              style={[s.chip, tool.id === t.id && { borderColor: C.lime }]}
            >
              <Text style={[s.mono, { fontSize: 11 }, tool.id === t.id && { color: C.lime }]}>{t.label}</Text>
            </TouchableOpacity>
          ))}
        </View>
        <TouchableOpacity style={s.btn} onPress={run} disabled={busy}>
          {busy ? (
            <ActivityIndicator color={C.bg} />
          ) : (
            <Text style={[s.btnText]}>Run tool</Text>
          )}
        </TouchableOpacity>
      </Card>
      {out ? (
        <Card>
          <Text style={s.mono}>{out}</Text>
        </Card>
      ) : null}
    </>
  );
}

function BriefsView() {
  const [token, setToken] = useState("");
  const [briefs, setBriefs] = useState<any[]>([]);
  const [msg, setMsg] = useState("");

  const load = async () => {
    setMsg("");
    try {
      const res = await fetch(`${API_URL}/api/briefs`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 401) {
        setMsg("Wrong ADMIN_TOKEN");
        return;
      }
      const data = await res.json();
      setBriefs(data.briefs ?? []);
    } catch {
      setMsg("Network error");
    }
  };

  return (
    <>
      <Card>
        <Text style={s.label}>Admin inbox</Text>
        <Text style={s.muted}>Enter the backend ADMIN_TOKEN to read submitted briefs.</Text>
        <TextInput
          value={token}
          onChangeText={setToken}
          placeholder="ADMIN_TOKEN"
          placeholderTextColor={C.muted}
          secureTextEntry
          style={s.input}
        />
        <TouchableOpacity style={s.btn} onPress={load}>
          <Text style={s.btnText}>Load briefs</Text>
        </TouchableOpacity>
        {msg ? <Text style={{ color: "#f87171", marginTop: 8 }}>{msg}</Text> : null}
      </Card>
      {briefs.map((b) => (
        <Card key={b.id}>
          <Text style={s.p}>
            <Text style={{ color: C.lime }}>#{b.id}</Text> {b.projectType}
          </Text>
          <Text style={s.muted}>
            {b.name} · {b.contact} · {b.budget || "?"} · {b.timeline || "?"}
          </Text>
          {b.notes ? <Text style={s.mono}>{b.notes}</Text> : null}
        </Card>
      ))}
    </>
  );
}

function Card({ children }: { children: React.ReactNode }) {
  return <View style={s.card}>{children}</View>;
}

const s = StyleSheet.create({
  root: { flex: 1, backgroundColor: C.bg },
  brand: { color: C.fg, fontSize: 20, fontWeight: "700", padding: 16, paddingBottom: 4 },
  body: { flex: 1 },
  card: { backgroundColor: C.card, borderColor: C.border, borderWidth: 1, borderRadius: 14, padding: 14, gap: 6 },
  h1: { color: C.fg, fontSize: 22, fontWeight: "700" },
  p: { color: C.fg, fontSize: 13, lineHeight: 19 },
  muted: { color: C.muted, fontSize: 12, lineHeight: 18 },
  mono: { color: C.muted, fontFamily: "monospace", fontSize: 12 },
  label: { color: C.fg, fontWeight: "600", fontSize: 13 },
  link: { color: C.lime, fontSize: 13, paddingVertical: 2 },
  chip: { borderRadius: 999, borderWidth: 1, borderColor: C.border, paddingHorizontal: 10, paddingVertical: 6 },
  btn: { backgroundColor: C.lime, borderRadius: 999, alignItems: "center", paddingVertical: 10, marginTop: 10 },
  btnText: { color: C.bg, fontWeight: "600", fontSize: 13 },
  input: {
    borderWidth: 1, borderColor: C.border, borderRadius: 10, color: C.fg, paddingHorizontal: 12,
    paddingVertical: 8, marginTop: 8,
  },
  tabbar: {
    flexDirection: "row", borderTopWidth: 1, borderTopColor: C.border, backgroundColor: C.bg,
  },
  tab: { flex: 1, alignItems: "center", paddingVertical: 12 },
  tabLabel: { color: C.muted, fontSize: 12, textTransform: "capitalize" },
});
