import config from '@/payload.config'
import { RootPage } from '@payloadcms/next/views'
import { importMap } from '../importMap.js'

type Args = {
  params: Promise<{
    select?: string[]
  }>
  searchParams: Promise<{
    [key: string]: string | string[]
  }>
}

const Page = async ({ params, searchParams }: Args) => {
  const { select } = await params
  return (
    <RootPage
      config={config}
      importMap={importMap}
      params={Promise.resolve({ segments: select && select.length > 0 ? select : (undefined as any) })}
      searchParams={searchParams}
    />
  )
}

export default Page
