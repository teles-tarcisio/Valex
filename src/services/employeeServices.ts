import { employeeRepository } from "../repositories/index.js";

export async function checkExistentEmployee(employeeId: number): Promise<Object> {
  const existentEmployee = await employeeRepository.findById(employeeId);
  if (!existentEmployee) {
    return undefined;
  }

  return existentEmployee;
}
