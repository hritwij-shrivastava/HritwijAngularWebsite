import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'skills',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'SKill Name',
      type: 'string',
    }),
    defineField({
      name: 'percentage',
      title: 'SKill Percentage',
      type: 'string',
    }),
  ],
})