import { compileMDX } from 'next-mdx-remote/rsc'
import type { FC } from 'react'


export const CompileMD: FC<{ md: string }> = async ({ md }) => {
  const { content } = await compileMDX({
    source: md,
    components: {
      h1: ({ children }) => (
        <h1 className='text-text-high/text-high mt-8 mb-4 px-2 py-4 text-3xl font-bold leading-normal border-brand-500 border-t-4 border-solid'>
          {children}
        </h1>
      ),
      h2: ({ children }) => (
        <h2 className='text-text-high/text-high mt-8 mb-8 px-2 pt-2 pb-2 text-3xl font-bold border-brand-500 border-b-2 border-solid leading-normal'>
          {children}
        </h2>
      ),
      h3: ({ children }) => (
        <h3 className="text-text-high/text-high flex mt-8 mb-8 text-2xl font-bold leading-normal before:ml-1 before:mr-[9px] before:mt-[7px] before:h-4 before:w-4 before:flex-shrink-0 before:bg-brand-800 before:content-['']">
          {children}
        </h3>
      ),
      h4: ({ children }) => (
        <h4 className="relative pl-6 text-xl font-bold leading-normal text-text-high/text-high before:absolute before:left-0 before:top-0.5 before:h-6 before:w-1 before:bg-brand-800 before:content-[''] after:absolute after:left-2 after:top-0.5 after:h-6 after:w-1 after:bg-brand-800 after:content-[''] mb-8 mt-8">
          {children}
        </h4>
      ),
      ul: ({ children }) => (<ul className='mx-4 pl-7 list-disc text-base flex flex-col gap-3 leading-normal'>{children}</ul>),
      li: ({ children }) => (<li className='font-light text-text-high/text-high'>{children}</li>),
      p: ({ children }) => (<p className='mt-4 mb-6 text-base font-light text-text-high/text-high leading-normal'>{children}</p>),
      a: ({ children, ...props }) => (<a className='text-text-high/text-high text-base hover:text-text-medium/text-medium hover:underline visited:text-text-disabled/text-disabled' {...props}>{children}</a>),
      hr: () => (<hr className='my-8' />),
      strong: ({ children }) => (<strong className='font-bold'>{children}</strong>),
    }
  })
  return content
}
