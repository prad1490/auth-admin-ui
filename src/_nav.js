export default {
  items: [
    {
      name: 'Home',
      url: '/',
      icon: 'icon-home',
      badge: {
        variant: 'info',
      }
    },
    {
      title: true,
      name: 'Administration',
      wrapper: {
        element: '',
        attributes: {},
      },
    },
    {
      name: 'Manage User',
      url: '#',
      icon: 'fa fa-university',
      children: [
        {
          name: 'Search user',
          url: '/users/search',
          icon: 'fa fa-circle-o'
        },
        {
          name: 'Create user',
          url: '/users/create',
          icon: 'fa fa-circle-o'
        }
        ]
    },
    {
        name: 'Manage Owners',
        url: '#',
        icon: 'fa fa-university',
        children: [
            {
                name: 'Owners',
                url: '/owners/owners',
                icon: 'fa fa-circle-o'
            }
        ]
    },
    {
      name: "Manage Domains",
      url: "/domains",
      icon: "fa fa-circle-o"
    },
    {
      name: "Token Verification",
      url: "/token",
      icon: "fa fa-circle-o"
    }
  ]
};
