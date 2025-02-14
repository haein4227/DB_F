import axios from "axios";
import React, { useState } from "react";

export async function POST(request) {
  const body = await request.json()
  // 여기서 실제 백엔드 서버로 장바구니 추가 요청을 보내야 합니다.
  console.log("장바구니 추가 요청:", body)

  // 임시 응답
  return new Response(JSON.stringify({ message: "장바구니에 추가 성공" }), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  })
}