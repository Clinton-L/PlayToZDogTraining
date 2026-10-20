import { useState } from 'react'
import blogPosts from '../assets/BlogPosts.json'

const sortedBlogPosts = [...blogPosts].sort((first, second) =>
  second.publishedAt.localeCompare(first.publishedAt),
)
const latestBlogPosts = sortedBlogPosts.slice(0, 3)
const archivedBlogPosts = sortedBlogPosts.slice(3)
const categories = [...new Set(sortedBlogPosts.map((post) => post.category))].sort(
  (first, second) => first.localeCompare(second),
)

function formatPublishedDate(publishedAt: string) {
  return new Intl.DateTimeFormat('en', { dateStyle: 'medium' }).format(
    new Date(`${publishedAt}T00:00:00`),
  )
}

function normalizeSearchText(value: string) {
  return value.toLocaleLowerCase().replace(/[\s,]+/g, ' ').trim()
}

function BlogPage() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedCategory, setSelectedCategory] = useState('')
  const isFiltering = Boolean(searchQuery.trim() || selectedCategory)
  const normalizedQuery = normalizeSearchText(searchQuery)
  const filteredBlogPosts = sortedBlogPosts.filter((post) => {
    const matchesCategory = !selectedCategory || post.category === selectedCategory
    const searchableText = normalizeSearchText(`${post.title} ${post.category}`)

    return matchesCategory && (!normalizedQuery || searchableText.includes(normalizedQuery))
  })

  const renderPostCard = (post: (typeof sortedBlogPosts)[number]) => (
    <article className="post-card" key={post.title}>
      <img className="post-image" src={post.imageUrl} alt={post.imageAlt} loading="lazy" />
      <div className="post-content">
        <div className="post-meta">
          <span>{post.category}</span>
          <span>{formatPublishedDate(post.publishedAt)}</span>
          <span>{post.readTime}</span>
        </div>
        <h2>{post.title}</h2>
        <p>{post.summary}</p>
        <details className="post-details">
          <summary>Read the note <span aria-hidden="true">↗</span></summary>
          <div className="post-body">
            {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          </div>
        </details>
      </div>
    </article>
  )

  return (
    <section className="inner-page content-width blog-page" aria-labelledby="blog-title">
      <div className="page-heading blog-heading">
        <p className="eyebrow"><span className="eyebrow-dot" /> FROM THE TRAINING JOURNAL</p>
        <h1 id="blog-title">Notes for life<br />with <em>your dog.</em></h1>
        <p className="page-lede">
          A few useful ideas for the everyday things you are learning together.
        </p>
      </div>
      <div className="blog-filters" role="search" aria-label="Filter blog posts">
        <label className="blog-filter-field">
          <span>Search posts</span>
          <input
            type="search"
            value={searchQuery}
            placeholder="Title or category"
            onChange={(event) => setSearchQuery(event.target.value)}
          />
        </label>
        <label className="blog-filter-field">
          <span>Category</span>
          <select
            value={selectedCategory}
            onChange={(event) => setSelectedCategory(event.target.value)}
          >
            <option value="">All categories</option>
            {categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>
        {isFiltering && (
          <button
            className="blog-clear-filters"
            type="button"
            onClick={() => {
              setSearchQuery('')
              setSelectedCategory('')
            }}
          >
            Clear filters
          </button>
        )}
      </div>
      {isFiltering ? (
        <section className="blog-search-results" aria-label="Search results">
          <p className="blog-results-count" role="status">
            {filteredBlogPosts.length} {filteredBlogPosts.length === 1 ? 'post' : 'posts'} found
          </p>
          {filteredBlogPosts.length > 0 ? (
            <div className="post-list">
              {filteredBlogPosts.map(renderPostCard)}
            </div>
          ) : (
            <p className="blog-empty-results">No posts match those filters. Try another search.</p>
          )}
        </section>
      ) : (
        <>
          <div className="post-list">
            {latestBlogPosts.map(renderPostCard)}
          </div>
          {archivedBlogPosts.length > 0 && (
            <section className="archive-section" aria-labelledby="archive-title">
              <div className="archive-heading">
                <p className="eyebrow">KEEP EXPLORING</p>
                <h2 id="archive-title">Earlier notes</h2>
              </div>
              <div className="archive-list">
                {archivedBlogPosts.map((post) => (
                  <details className="archive-post" key={post.title}>
                    <summary>
                      <img className="archive-post-image" src={post.imageUrl} alt="" loading="lazy" />
                      <span className="archive-post-meta">
                        <span>{formatPublishedDate(post.publishedAt)}</span>
                        <span>{post.category}</span>
                      </span>
                      <span className="archive-post-title">{post.title}</span>
                      <span className="archive-toggle" aria-hidden="true">+</span>
                    </summary>
                    <div className="archive-post-body">
                      <p>{post.summary}</p>
                      {post.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
                    </div>
                  </details>
                ))}
              </div>
            </section>
          )}
        </>
      )}
    </section>
  )
}

export default BlogPage