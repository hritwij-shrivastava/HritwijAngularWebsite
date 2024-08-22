import {defineField, defineType} from 'sanity'

export default defineType({
  name: 'about',
  title: 'About',
  type: 'document',
  fields: [
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
      name: 'backgroundImage',
      title: 'Background image',
      type: 'image',
      description: 'Please upload an image with dimensions 1500 x 700 px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: Rule => Rule.max(120).warning(`Name shouldn't be more than 120 characters.`)
    }),
    defineField({
      name: 'dob',
      title: 'Date of Birth',
      type: 'datetime'
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: "string",
      validation: (Rule) =>
        Rule.regex(
          /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
          {
            name: "email",
            invert: false,
          }
        ),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
      validation: Rule => Rule.max(20).warning(`Phone shouldn't be more than 20 characters.`)
    }),
    defineField({
      name: 'website',
      title: 'Website Link',
      type: 'string'
    }),
    defineField({
      name: 'video',
      title: 'Video ID',
      type: 'string'
    }),
    defineField({
      name: 'videoThumb',
      title: 'Video Thumb',
      type: 'image',
      description: 'Please upload an image with dimensions 1500 x 700 px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'nationality',
      title: 'Nationality',
      type: 'string',
      validation: Rule => Rule.max(20).warning(`Nationality shouldn't be more than 20 characters.`)
    }),
    defineField({
      name: 'address',
      title: 'Address',
      type: 'string'
    }),
    defineField({
      name: 'profession',
      title: 'Profession',
      type: 'string',
      validation: Rule => Rule.max(120).warning(`Profession shouldn't be more than 120 characters.`)
    }),
    defineField({
      name: 'description',
      title: 'Short Description',
      type: 'string',
      validation: Rule => Rule.max(250).warning(`A short description shouldn't be more than 250 characters.`)
    }),
    defineField({
      name: 'aboutImage',
      title: 'About image',
      type: 'image',
      description: 'Please upload an image with dimensions 1500 x 700 px.',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'resume',
      title: 'Resume',
      type: 'file'
    }),
    defineField({
      name: 'aboutMeSpan',
      title: 'AboutMe section first heading',
      type: 'string'
    }),
    defineField({
      name: 'aboutMeH2',
      title: 'AboutMe section main heading',
      type: 'string'
    }),
    defineField({
      name: 'aboutMeP',
      title: 'AboutMe section paragraph',
      type: 'string'
    }),
    defineField({
      name: 'aboutMeP2',
      title: 'AboutMe section second paragraph',
      type: 'string'
    }),
    defineField({
      name: 'myServicesMeSpan',
      title: 'My Services section first heading',
      type: 'string'
    }),
    defineField({
      name: 'myServicesH2',
      title: 'My Services section main heading',
      type: 'string'
    }),
    defineField({
      name: 'myServicesP',
      title: 'My Services Section paragraph',
      type: 'string'
    }),
    defineField({
      name: 'chooseUsH2',
      title: 'Choose Us section main heading',
      type: 'string'
    }),
    defineField({
      name: 'chooseUsP',
      title: 'Choose Us section main paragraph',
      type: 'string'
    }),
    defineField({
      name: 'chooseUsH41',
      title: 'Choose Us section first sub heading',
      type: 'string'
    }),
    defineField({
      name: 'chooseUsP1',
      title: 'Choose Us section first sub paragraph',
      type: 'string'
    }),
    defineField({
      name: 'chooseUsH42',
      title: 'Choose Us section second sub heading',
      type: 'string'
    }),
    defineField({
      name: 'chooseUsP2',
      title: 'Choose Us Section second sub paragraph',
      type: 'string'
    }),
  ],

  preview: {
    select: {
      title: 'profession',
      author: 'name',
      media: 'mainImage',
    },
    prepare(selection) {
      const {author} = selection
      return {...selection, subtitle: author && `by ${author}`}
    },
  },
})
