using System;

namespace websocketChat.Core.Authorization
{
    public class UserIdentity : IEquatable<UserIdentity>
    {
        public string Name { get; set; }
        public string PhoneNumber { get; set; }
        public string Email { get; set; }

        public override bool Equals(object other) => Equals(other as UserIdentity);
        public bool Equals(UserIdentity other)
        {
            return Name == other.Name
                && PhoneNumber == other.PhoneNumber
                && Email == other.Email;
        }

        public override int GetHashCode()
        {
            unchecked
            {
                int hash = (int)2166136261;
                hash = (16777619 * hash) ^ (Name?.GetHashCode() ?? 0);
                hash = (16777619 * hash) ^ (PhoneNumber?.GetHashCode() ?? 0);
                hash = (16777619 * hash) ^ (Email?.GetHashCode() ?? 0);
                return hash;
            }
        }
    }
}