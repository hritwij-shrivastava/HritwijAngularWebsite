import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'experience',
  title: 'Experience',
  type: 'document',
  fields: [
    defineField({
      name: 'slno',
      title: 'Serial No.',
      type: 'string'
    }),
    defineField({
      name: 'company',
      title: 'Company Name',
      type: 'string'
    }),
    defineField({
      name: 'doj',
      title: 'Date of Joining',
      type: 'datetime'
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string'
    }),
    defineField({
      name: 'shortDesc',
      title: 'Short Description',
      type: 'string'
    }),
  ],

  preview: {
    select: {
      title: 'company',
      date: 'doj'
    },
    prepare(selection) {
      const {title, date} = selection
      return {
        title: title,
        subtitle: new Date(date).getFullYear().toString() // YYYY-MM-DD --> YYYY
      }
    }
  }
})
