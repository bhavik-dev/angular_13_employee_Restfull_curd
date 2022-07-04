import { animate, animateChild, query, sequence, stagger, state, style, transition, trigger } from '@angular/animations';

export const leftSlideEffect = trigger('leftSlideEffect',
  [
    state(
      'void',
      style({
        background: '#d9ddfa',
        borderBottomColor: '#d9ddfa',
        opacity: 0,
        transform: 'translateX(-550px)',
        'box-shadow': 'none',
      })
    ),
    transition('void => *', sequence([animate('.5s ease')])),
    transition('* => void', [animate('1s ease')]),
  ]);

export const rightSlideEffect = trigger('rightSlideEffect',
  [
    state(
      'void',
      style({
        background: '#d9ddfa',
        borderBottomColor: '#d9ddfa',
        opacity: 0,
        transform: 'translateX(550px)',
        'box-shadow': 'none',
      })
    ),
    transition('void => *', sequence([animate('.5s ease')])),
    transition('* => void', [animate('1s ease')]),
  ]);

export const rowsAnimation = trigger('rowsAnimation',
  [
    transition('void => *', [
      style({
        height: '*',
        opacity: '0',
        transform: 'translateX(-550px)',
        'box-shadow': 'none',
      }),
      sequence([
        animate(
          '.35s ease',
          style({
            height: '*',
            opacity: '.2',
            transform: 'translateX(0)',
            'box-shadow': 'none',
          })
        ),
        animate(
          '.35s ease',
          style({ height: '*', opacity: 1, transform: 'translateX(0)' })
        ),
      ]),
    ]),
  ]);

export const blub = trigger('blub',
  [
    transition(':leave', [
      style({ background: '#d9ddfa' }),
      query('*', stagger(-150, [animateChild()]), { optional: true }),
    ]),
  ]);


export const fadeIn = trigger('fadeIn',
  [
    state('void', style({ opacity: 0, })),
    transition('void => *', [animate(500)]),
    transition('* => void', [animate(500)])
  ]);
