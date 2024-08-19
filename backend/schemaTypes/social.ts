import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'social',
  title: 'Scocial Media',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      name: 'url',
      title: 'url',
      type: 'string',
    }),
    defineField({
      name: 'cssClass',
      title: 'CSS Class',
      type: 'string',
    }),
  ],
})
