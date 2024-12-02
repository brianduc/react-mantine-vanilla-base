import { Button, Container, Group, Text, Title } from '@mantine/core';

export function NotFound() {
  return (
    <Container className='pt-[80px] pb-[80px]'>
      <div className='text-center font-extrabold text-[38px] leading-[1] mb-[calc(1.5*var(--mantine-spacing-xl))] text-[var(--mantine-color-gray-2)] sm:text-[32px]'>
        404
      </div>
      <Title className='font-[var(--mantine-font-family)] text-center text-[38px] sm:text-[32px]'>
        You have found a secret place.
      </Title>
      <Text
        c='dimmed'
        size='lg'
        ta='center'
        className='max-w-[500px] mx-auto mt-[var(--mantine-spacing-xl)] mb-[calc(1.5*var(--mantine-spacing-xl))]'
      >
        Unfortunately, this is only a 404 page. You may have mistyped the address, or the page has
        been moved to another URL.
      </Text>
      <Group className='justify-center'>
        <Button
          variant='subtle'
          size='md'
          onClick={() => {
            window.location.href = '/';
          }}
        >
          Take me back to home page
        </Button>
      </Group>
    </Container>
  );
}
