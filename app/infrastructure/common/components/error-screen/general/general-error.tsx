import { Button, Container, Group, Text, Title } from '@mantine/core';

export function GeneralError() {
  return (
    <div className='pt-[80px] pb-[120px] bg-[var(--mantine-color-blue-filled)]'>
      <Container>
        <div className='text-center font-extrabold text-[220px] leading-[1] mb-[calc(var(--mantine-spacing-xl)*1.5)] text-[var(--mantine-color-blue-3)] sm:text-[120px]'>
          500
        </div>
        <Title className='font-[Greycliff CF,var(--mantine-font-family)] text-center font-extrabold text-[38px] text-[var(--mantine-color-white)] sm:text-[32px]'>
          Something bad just happened...
        </Title>
        <Text
          size='lg'
          ta='center'
          className='max-w-[540px] mx-auto mt-[var(--mantine-spacing-xl)] mb-[calc(var(--mantine-spacing-xl)*1.5)] text-[var(--mantine-color-blue-1)]'
        >
          Our servers could not handle your request. Don&apos;t worry, our development team was
          already notified. Try refreshing the page.
        </Text>
        <Group className='justify-center'>
          <Button variant='white' size='md'>
            Refresh the page
          </Button>
        </Group>
      </Container>
    </div>
  );
}
