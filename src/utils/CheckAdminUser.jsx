export const CheckAdminUser = currentUser => {
  if (!currentUser && !Array.isArray(currentUser.userRoles)) return false
  const { userRoles } = currentUser
  if (userRoles && userRoles.includes('admin')) return true
  
  return false
}