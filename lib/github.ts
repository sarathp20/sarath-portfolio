// lib/github.ts

export interface GitHubRepo {
    id: number
    name: string
    description: string | null
    html_url: string
    language: string | null
    stargazers_count: number
    topics: string[]
    fork: boolean
  }
  
  // GitHub Search API wraps results in an "items" array
  interface GitHubSearchResponse {
    items: GitHubRepo[]
  }
  
  export async function getPortfolioRepos(): Promise<GitHubRepo[]> {
    const username = process.env.GITHUB_USERNAME
    const token    = process.env.GITHUB_TOKEN
  
    const res = await fetch(
        `https://api.github.com/search/repositories?q=user:${username}+topic:portfolio+fork:true&sort=updated`,
        //                                                                              ↑ add this
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: 'application/vnd.github+json',
          },
          next: { revalidate: 300 },
        }
      )
  
    if (!res.ok) {
      console.error('GitHub fetch failed:', res.status)
      return []
    }
  
    const data: GitHubSearchResponse = await res.json()
    return data.items  // no fork filter needed — you control exactly what's tagged
  }