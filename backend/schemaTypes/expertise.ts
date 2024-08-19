import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'expertise',
  title: 'Expertise',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: Rule => Rule.max(120).warning(`A title shouldn't be more than 120 characters.`)
    }),
    defineField({
      name: 'bannerImage',
      title: 'Banner image',
      type: 'image',
      description: 'Please upload an image with dimensions 800 x 800 px.',
      options: {
        hotspot: true,
      },
    })
  ],

  preview: {
    select: {
      title: 'title',
      media: 'bannerImage',
    }
  },
})
