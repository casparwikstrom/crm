import { Builder } from '@builder.io/react'
import dynamic from 'next/dynamic'

Builder.registerComponent(
  dynamic(() => import('../layouts/ListLayout')),
  {
    name: 'ListLayout',
  }
)
