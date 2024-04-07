import { Role } from 'src/roles/entities/role.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class RolesSeederService {
  constructor(
    @InjectRepository(Role)
    private readonly roleRepository: Repository<Role>,
  ) {}

  async seedRoles() {
    console.log("Entered Seeder");
    try {
      // Define your role data
      const rolesData = [
        { name: 'role1', description: 'Description of role1' },
        { name: 'role2', description: 'Description of role2' },
        // Add more role data as needed
      ];

      // Loop through the role data and create roles
      for (const roleData of rolesData) {
        const role = new Role();
        role.name = roleData.name;
        role.description = roleData.description;
        await this.roleRepository.save(role); // Save the role
      }

      console.log('Roles seeded successfully');
    } catch (error) {
      console.error('Error seeding roles:', error);
    }
  }
}
