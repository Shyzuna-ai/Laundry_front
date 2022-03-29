import React from 'react';
import {
  MDBFooter,
  MDBContainer,
  MDBIcon
  
} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter className='bg-dark text-center text-white sticky-md-top '>
      <MDBContainer className='p-5 pb-0 page-container'>
        <section className='mb-4 pb-0'>
          <a className='btn btn-outline-white btn-floating m-1' href='https://www.facebook.com/eksadharma.prathama.5' role='button'>
            <MDBIcon fab icon="facebook" />
          </a>

          <a className='btn btn-outline-white btn-floating m-1' href='https://twitter.com/Shyzuna_' role='button'>
            <MDBIcon fab icon='twitter' />
          </a>

          <a className='btn btn-outline-white btn-floating m-1' href='https://play-lh.googleusercontent.com/RzF8JAZMFQKX0x-2vcUAO7LVZ_6ZUtObK7Uxn2rwquO2c7MRohfROcrZQwPJAXVHRhU' role='button'>
            <MDBIcon fab icon='google' />
          </a>
          <a className='btn btn-outline-white btn-floating m-1' href='https://www.instagram.com/shyzuna/' role='button'>
            <MDBIcon fab icon='instagram' />
          </a>

          <a className='btn btn-outline-white btn-floating m-1' href='https://www.linkedin.com/in/eksa-dharma-prathama-4325b4231/' role='button'>
            <MDBIcon fab icon='linkedin-in' />
          </a>

          <a className='btn btn-outline-white btn-floating m-1' href='https://github.com/Shyzuna-ai' role='button'>
            <MDBIcon fab icon='github' />
          </a>
        </section>
      </MDBContainer>

      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}>
        © 2022 Copyright : 
        <a className='' href='https://i.kym-cdn.com/entries/icons/original/000/039/393/cover2.jpg' style={{color: '#ffb7c5'}}>
        ⠀Shyzuna
        </a>
      </div>
    </MDBFooter>
  );
}