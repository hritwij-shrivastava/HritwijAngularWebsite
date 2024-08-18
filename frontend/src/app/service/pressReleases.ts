export interface pressReleases {
        _type: string,
        _id: string,
        categories: [
            {
                _ref: string,
                _type: string,
                _key: string
            }
        ],
        author: {
            _ref: string,
            _type: string
        },
        author_name: string,
        _createdAt: string,
        tags: [
            {
                _type: string,
                _key: string,
                _ref: string
            },
            {
                _ref: string,
                _type: string,
                _key: string
            }
        ],
        _rev: string,
        body: [
            {
                style: string,
                _key: string,
                markDefs: [],
                children: [
                    {
                        _type: string,
                        marks: [],
                        text: string,
                        _key: string
                    }
                ],
                _type: string
            }
        ],
        backgroundImage: {
            asset: {
                _ref: string,
                _type: string
            },
            _type: string
        },
        title: string,
        bannerImage: {
            _type: string,
            asset: {
                _ref: string,
                _type: string
            }
        },
        mainImage: {
            _type: string,
            asset: {
                _ref: string,
                _type: string
            }
        },
        _updatedAt: string,
        slug: {
            current: string,
            _type: string
        },
        publishedAt: string
    }