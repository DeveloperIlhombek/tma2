"use client";

import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useTelegram } from "@/hooks/useTelegram";
import { haptic } from "@/lib/telegram";

export default function LoginPage() {
  const { login, isLoading, error } = useAuth();
  const { user, isReady, isTMA } = useTelegram();

  // Auto-login if initData available
  useEffect(() => {
    if (isReady && isTMA) {
      login();
    }
  }, [isReady, isTMA, login]);

  const handleManualLogin = () => {
    haptic.medium();
    login();
  };

  return (
    <div
      className="page-enter"
      style={{
        flex: 1,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "24px",
        backgroundColor: "var(--tg-bg)",
        gap: "24px",
      }}
    >
      {/* Logo / Icon */}
      <div
        style={{
          width: 80,
          height: 80,
          borderRadius: "22px",
          background: "var(--tg-button)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontSize: 40,
          boxShadow: "0 8px 24px color-mix(in srgb, var(--tg-button) 40%, transparent)",
        }}
      >
        📋
      </div>

      {/* Title */}
      <div style={{ textAlign: "center", gap: "8px", display: "flex", flexDirection: "column" }}>
        <h1
          style={{
            fontSize: "24px",
            fontWeight: 700,
            color: "var(--tg-text)",
            margin: 0,
          }}
        >
          Davomat Tizimi
        </h1>
        <p
          style={{
            fontSize: "15px",
            color: "var(--tg-subtitle)",
            margin: 0,
            lineHeight: 1.4,
          }}
        >
          O'quv markazi davomat boshqaruv tizimi
        </p>
      </div>

      {/* Loading or User Info */}
      {isLoading ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "12px",
          }}
        >
          <LoadingSpinner />
          <p style={{ fontSize: "14px", color: "var(--tg-hint)", margin: 0 }}>
            {user ? `Xush kelibsiz, ${user.first_name}!` : "Kirish..."}
          </p>
        </div>
      ) : (
        <div style={{ width: "100%", maxWidth: "320px", display: "flex", flexDirection: "column", gap: "12px" }}>
          {!isTMA && (
            <div
              style={{
                background: "color-mix(in srgb, var(--status-late) 15%, transparent)",
                border: "1px solid var(--status-late)",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                color: "var(--status-late)",
                textAlign: "center",
              }}
            >
              ⚠️ Telegram Mini App orqali oching
            </div>
          )}

          {error && (
            <div
              style={{
                background: "color-mix(in srgb, var(--status-absent) 12%, transparent)",
                border: "1px solid var(--status-absent)",
                borderRadius: "12px",
                padding: "12px 16px",
                fontSize: "14px",
                color: "var(--status-absent)",
                textAlign: "center",
              }}
            >
              {error}
            </div>
          )}

          <button
            className="tg-btn"
            onClick={handleManualLogin}
            disabled={isLoading}
          >
            Kirish
          </button>
        </div>
      )}
    </div>
  );
}

function LoadingSpinner() {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        borderRadius: "50%",
        border: "3px solid color-mix(in srgb, var(--tg-button) 20%, transparent)",
        borderTopColor: "var(--tg-button)",
        animation: "spin 0.8s linear infinite",
      }}
    />
  );
}
