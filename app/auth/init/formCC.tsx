"use client"

import { LinkButton } from "@/app/components/extendedUI"
import { Title } from "@mantine/core"

export function AuthInitForm({originalEmailAddr}: {originalEmailAddr?: string}) {
    async function callUpdate() {

    }
    return <div><Title order={2}>初期設定</Title><p>Steraの利用を開始する前に、最低限の設定が必要です。</p><LinkButton href="/auth/logout" variant="default" mt={40}>ログアウト</LinkButton></div>
}