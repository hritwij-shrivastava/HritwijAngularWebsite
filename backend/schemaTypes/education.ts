import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'slno',
      title: 'Serial No.',
      type: 'string'
    }),
    defineField({
      name: 'courseTitle',
      title: 'Course Title',
      type: 'blockContent',
    }),
    defineField({
      name: 'yop',
      title: 'Year of Passing',
      type: 'datetime'
    }),
    defineField({
      name: 'courseName',
      title: 'Course Name',
      type: 'string'
    }),
    defineField({
      name: 'courseDesc',
      title: 'Course Description',
      type: 'string'
    }),
  ],

  preview: {
    select: {
      title: 'courseName',
      date: 'yop'
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
