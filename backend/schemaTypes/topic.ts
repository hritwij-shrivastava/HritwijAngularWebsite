import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'topic',
  title: 'Topic',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.max(120).warning(`A title shouldn't be more than 120 characters.`)
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
      name: 'topicType',
      title: 'Choose Topic Type',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Main Topic', value: 'mainTopic' },
          { title: 'Sub Topic', value: 'subTopic' }
        ],
      }
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
      name: 'mainImage',
      title: 'Main image',
      type: 'image',
      description: 'Please upload an image with dimensions 1500 x 700 px.',
      options: {
        hotspot: true,
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
      name: 'publishedAt',
      title: 'Published at',
      type: 'datetime',
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      validation: Rule => Rule.max(250).warning(`A short description shouldn't be more than 250 characters.`)
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'cssFile',
      type: 'file',
      title: 'CSS File'
    }),
    defineField({
      name: 'subtopic',
      title: 'Sub Topic',
      type: 'array',
      of: [{type: 'reference', to: {type: 'topic'}}],
    }),
  ],

  preview: {
    select: {
      title: 'title',
      topicType: 'topicType', // Select the entire array
      media: 'mainImage',
    },
    prepare(selection: { title: string; topicType: string[]; media: any }) {
      const {title, topicType, media} = selection
      const subtitle = topicType && topicType.length > 0 ? topicType.map((type: string) => type === 'mainTopic' ? 'Main Topic' : 'Sub Topic').join(', ') : 'No Topic Type'
      return {
        title: title,
        subtitle: subtitle, // Display all selected topic types
        media: media,
      }
    }
  },
})