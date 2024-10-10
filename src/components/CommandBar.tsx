'use client'

import { useDebouncedEffect } from '@payloadcms/ui'
import {
  type Action,
  ActionImpl,
  KBarAnimator,
  KBarPortal,
  KBarPositioner,
  KBarResults,
  KBarSearch,
  createAction,
  useKBar,
  useMatches,
  useRegisterActions,
} from 'kbar'
import { useRouter } from 'next/navigation'
import { useState } from 'react'

import { trpc } from '@/trpc/client'
import { useMetadata } from '@/utils/metadataContext'

const CommandBar = () => {
  const [formattedSearchResults, setFormattedSearchResults] = useState<
    Action[]
  >([])
  const router = useRouter()

  // if we return state that time only getting the searchQuery, visualState
  const { query, searchQuery, visualState } = useKBar(state => {
    return state
  })

  const { redirectionLinks } = useMetadata()

  const { mutate: globalSearchMutate } = trpc.search.globalSearch.useMutation({
    // during mutation adding searching text
    onMutate: () => {
      const loadingAction = createAction({
        name: `Searching...`,
        subtitle: searchQuery,
      })

      setFormattedSearchResults([loadingAction])
    },
    // on success adding those results
    onSuccess: data => {
      if (data && data.length > 0) {
        const list = data.map(result => {
          const section = result?.parsedValues?.category as
            | 'blogs'
            | 'tags'
            | 'authors'

          return {
            id: result.id,
            name: result.parsedValues?.title || '',
            subtitle: result.parsedValues?.description || '',
            perform: () => {
              if (redirectionLinks) {
                const { authorLink, blogLink, tagLink } = redirectionLinks

                const linkMap = {
                  blogs: blogLink,
                  tags: tagLink,
                  authors: authorLink,
                }

                const link = linkMap[section]

                const slug = link && typeof link !== 'string' ? link.path! : ''
                const slicedSlug = slug ? slug.split('[')[0] : ''

                if (slug) {
                  return router.push(
                    `${slicedSlug}${result?.parsedValues?.path}`,
                  )
                }
              }
            },
            section,
            priority: result.priority as number,
          }
        })

        setFormattedSearchResults(list)
      } else {
        const noResultsAction = createAction({
          name: `No results Found!`,
          subtitle: searchQuery,
        })

        setFormattedSearchResults([noResultsAction])
      }
    },
    // on error adding no results found
    onError: () => {
      const noResultsAction = createAction({
        name: `No results Found!`,
        subtitle: searchQuery,
      })

      setFormattedSearchResults([noResultsAction])
    },
  })

  useDebouncedEffect(
    () => {
      // not calling the API on initial mount
      if (visualState === 'hidden') return

      globalSearchMutate({ search: searchQuery })
    },
    800,
    [searchQuery],
  )

  // This hook will update the kbar actions
  useRegisterActions(formattedSearchResults, [formattedSearchResults])

  const { results } = useMatches()

  const SearchItem = ({
    item,
    active,
  }: {
    item: NonNullable<ActionImpl>
    active: boolean
  }) => {
    const { name, subtitle, section = '' } = item

    return (
      <div
        className='block rounded-md p-2 hover:cursor-pointer data-[active-item=true]:bg-secondary/10'
        data-active-item={active}>
        <div className='flex gap-2'>
          <p>{name}</p>
        </div>

        {/* here hiding the description when no results found or during API loading */}
        {!['No results Found!', 'Searching'].includes(name) && (
          <p className='overflow-hidden text-ellipsis text-nowrap text-sm text-secondary'>
            {subtitle}
          </p>
        )}
      </div>
    )
  }

  return (
    <>
      <button
        className='rounded-full bg-primary p-2 text-sm font-medium text-white hover:bg-primary/80 lg:static lg:bottom-0 lg:right-0'
        onClick={() => {
          // in case of no results found clearing the search results
          if (formattedSearchResults.length > 0) {
            formattedSearchResults.forEach(item => {
              if (item?.name?.includes('No results found')) {
                setFormattedSearchResults([])
                return
              }
            })
          }

          // this will toggle the search-bar
          query.toggle()
        }}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth='1.5'
          stroke='currentColor'
          className='size-4 stroke-slate-900'>
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
          />
        </svg>
      </button>

      <KBarPortal>
        <KBarPositioner className='z-[70] h-full bg-black/50 backdrop-blur-sm'>
          <KBarAnimator className='w-full max-w-lg'>
            <div className='mx-auto w-full rounded-lg border bg-slate-900 py-4'>
              <div className='relative px-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  fill='none'
                  viewBox='0 0 24 24'
                  strokeWidth='1.5'
                  stroke='currentColor'
                  className='absolute left-6 top-2.5 size-5 stroke-slate-600'>
                  <path
                    strokeLinecap='round'
                    strokeLinejoin='round'
                    d='m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z'
                  />
                </svg>

                <KBarSearch
                  defaultPlaceholder='Search'
                  className='border-input block w-full rounded-md border bg-inherit stroke-slate-600 py-2 pl-9  pr-3.5 text-secondary outline-none placeholder:text-secondary sm:text-sm sm:leading-6'
                />
              </div>

              {results && results.length > 0 ? (
                <div className='mx-4 mt-2'>
                  <KBarResults
                    items={results}
                    onRender={({ item, active }) => {
                      return (
                        <div>
                          {typeof item === 'string' ? (
                            <div className='pb-2 text-sm capitalize text-secondary'>
                              {item}
                            </div>
                          ) : (
                            <SearchItem item={item} active={active} />
                          )}
                        </div>
                      )
                    }}
                  />
                </div>
              ) : null}
            </div>
          </KBarAnimator>
        </KBarPositioner>
      </KBarPortal>
    </>
  )
}

export default CommandBar
