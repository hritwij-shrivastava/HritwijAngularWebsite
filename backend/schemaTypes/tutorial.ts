import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'tutorial',
  title: 'Tutorial',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.max(120).warning(`A title shouldn't be more than 120 characters.`),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      description: 'Slug will be used for the url creation',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      description: 'Please upload an image with dimensions 800 x 800 px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      validation: Rule => Rule.max(250).warning(`A short description shouldn't be more than 250 characters.`)
    }),
    defineField({
      name: 'topics',
      title: 'Topic List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'mainTitle',
              title: 'Key',
              type: 'string',
            },
            {
              name: 'topics',
              title: 'Topics',
              type: 'array',
              of: [{type: 'reference', to: [{type: 'topic'}]}],
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: {type: 'author'},
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: {type: 'category'},
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{type: 'reference', to: {type: 'tags'}}],
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
  ],
  preview: {
    select: {
      title: 'title',
      author: 'author.name',
      media: 'bannerImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
