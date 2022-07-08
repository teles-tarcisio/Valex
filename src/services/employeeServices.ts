import { employeeRepository } from "../repositories/index.js";

export async function checkExistentEmployee(employeeId: number): Promise<boolean> {
  const existentEmployee = await employeeRepository.findById(employeeId);
  if (!existentEmployee) {
    return false;
  }

  return true;
}
