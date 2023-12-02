import { EntityRepository, Repository } from 'typeorm';
import { ApplicationSettings } from '../entities/application-settings.entity';

@EntityRepository(ApplicationSettings)
export class ApplicationSettingsRepository extends Repository<ApplicationSettings> {}