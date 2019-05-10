import { Phase } from './phase.entity';

export const PhaseProvider = {
    provide: 'PhaseRepository',
    useValue: Phase
}