import {render, screen} from '@testing-library/react'
import '@testing-library/jest-dom'
import { LandingPage } from '../LandingPage'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../../../AuthProvider'


test('loads and displays greeting', async () => {
  render(
    <AuthProvider>
      <BrowserRouter><LandingPage/></BrowserRouter>
    </AuthProvider>
  )
  expect(screen.getByRole('heading', {level: 1})).toHaveTextContent('Geotrails 🌎')
})

