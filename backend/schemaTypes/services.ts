import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'services',
  title: 'Services',
  type: 'document',
  fields: [
    defineField({
      name: 'slno',
      title: 'Serial No.',
      type: 'string'
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
      name: 'title',
      title: 'Title',
      type: 'string'
    }),
    defineField({
      name: 'desc',
      title: 'Description',
      type: 'string'
    }),
  ],

  preview: {
    select: {
      title: 'title',
      media: 'mainImage',
    }
  },
})
